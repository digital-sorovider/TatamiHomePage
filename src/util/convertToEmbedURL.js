const convertToEmbedURL = (url) => {
    if (url.includes('embed') || !url.includes('youtu')) return url

    let videoId;
    let embedURL;

    const urlObj = new URL(url);
    const urlParams = new URLSearchParams(urlObj.search);

    if (url.includes('youtu.be')) {
        // Short URL形式
        videoId = urlObj.pathname.split('/')[1];
    } else if (url.includes('youtube.com')) {
        // 通常のURL形式
        videoId = urlParams.get('v');
        // `v` パラメータを削除
        urlParams.delete('v');
    }

    if (!videoId) return null;

    // 埋め込み用のURLを生成
    embedURL = `https://www.youtube.com/embed/${videoId}`;

    // 他のクエリパラメータを追加
    if (urlParams.toString()) {
        embedURL += `?${urlParams.toString()}`;
    }

    return embedURL;
};

export default convertToEmbedURL