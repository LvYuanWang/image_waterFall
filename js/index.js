(function () {
    var content_img = document.querySelector('.content-img');
    var imgWidth = 220;
    function getMin(arr) {
        var Min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < Min) {
                Min = arr[i];
            }
        }
        return Min;
    }
    function spaceList() {
        var contentWidth = content_img.clientWidth;
        var imgNum = Math.floor(contentWidth / imgWidth);   // 图片数量
        var surplus = contentWidth - imgNum * imgWidth;   // 剩余空间
        var space = surplus / (imgNum + 1);     // 间隔
        return {
            imgNum,
            space
        }
    }
    function setPositions() {
        var contentSpace_imgNum = spaceList();  // 获取图片数量和间隔
        var arr = new Array(contentSpace_imgNum.imgNum).fill(0);  // 创建数组
        for (let i = 0; i < content_img.children.length; i++) {
            var img = content_img.children[i];
            var min = getMin(arr);  // 获取最小值
            img.style.top = min + 'px';
            var arrIndex = arr.indexOf(min);  // 获取最小值的索引
            arr[arrIndex] += img.height + contentSpace_imgNum.space;  // 更新数组
            var left = (arrIndex + 1) * contentSpace_imgNum.space + arrIndex * imgWidth;
            img.style.left = left + 'px';
            var max = Math.max(...arr);  // 获取最大值
            content_img.style.height = max + 'px';
        }
    }
    function createImgs() {
        for (let i = 0; i <= 40; i++) {
            var img = document.createElement('img');
            img.src = '../img/' + i + '.jpg';
            img.style.width = imgWidth + 'px';
            content_img.appendChild(img);
            img.onload = setPositions;
        }
    }
    function debounce() {
        var timeId = null;
        window.addEventListener('resize', function () {
            if (timeId) {
                clearTimeout(timeId);
            }
            timeId = setTimeout(() => {
                setPositions();
            }, 500);
        })
    }
    var init = function () {
        // 创建图片
        createImgs();
        // 防抖函数: 监听窗口变化
        debounce();
    }
    init();
})()