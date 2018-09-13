// 防抖动 时间间隔大于ms才会执行
export let debounce = (fun, ms) => {
    let timer = 0;
    return ()=>{
        clearTimeout(timer);
        timer = setTimeout(() => {
           fun && fun();
        }, ms);
    }
}

// 节流 每ms时间内一定会执行一次
export let throttle = (fun, ms) => {
    let last = + new Date();
    return ()=>{
        let cur = + new Date();
        if(cur - last > ms){
            fun && fun();
            last = cur;
        }
    }
}

// 图片懒加载
export let lazyLoad = {
    nodes: [],
    inView(el){
        let rect = el.getBoundingClientRect();
        return (rect.top > 0 && rect.top) <= window.innerHeight
    },
    init(){
        this.nodes = Array.from(document.querySelectorAll('[data-src]'));
        // console.log('nodes...', this.nodes);
    },
    loadImg(){
        this.nodes.forEach(item=>{
            let data_src = item.getAttribute('data-src');
            if(this.inView(item)){
                if(item.src != data_src){
                    item.src = data_src;
                }
            }
        })
    }
}
