// 创建文本选择的上下文菜单
chrome.contextMenus.create({
    id: "sendToTimeMachineText",  // 唯一的 ID
    title: "发送“%s”到时光机",
    contexts: ['selection']
});

// 创建图像的上下文菜单
chrome.contextMenus.create({
    id: "sendToTimeMachineImage",  // 唯一的 ID
    title: "发送这张图片到时光机",
    contexts: ['image']
});

// 监听上下文菜单点击事件
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "sendToTimeMachineText") {
        // 处理发送文本到时光机的逻辑
        chrome.storage.sync.set({open_action: "save_text", open_content: info.selectionText}, function() {
            chrome.windows.create({
                url: chrome.runtime.getURL("html/popup.html"),
                left: 50,
                top: 50,
                width: 420,
                height: 200,
                type: "popup"
            });
        });
    }

    if (info.menuItemId === "sendToTimeMachineImage") {
        // 处理发送图片到时光机的逻辑
        chrome.storage.sync.set({open_action: "upload_image", open_content: info.srcUrl}, function() {
            chrome.windows.create({
                url: chrome.runtime.getURL("html/popup.html"),
                left: 50,
                top: 50,
                width: 420,
                height: 200,
                type: "popup"
            });
        });
    }
});