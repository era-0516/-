// スロットで使用する写真のファイル名をここに記述
// `images/`フォルダ内の写真名を正確に入力してください
const photoFiles = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg'
];

const slotImage = document.getElementById('slot-image');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resultDiv = document.getElementById('result');
const postToXLink = document.getElementById('post-to-x-link');

let slotInterval;

// スタートボタンがクリックされたときの処理
startButton.addEventListener('click', () => {
    // スタートボタンを無効化、ストップボタンを有効化
    startButton.disabled = true;
    stopButton.disabled = false;
    resultDiv.textContent = ''; // 結果表示をクリア

    let currentIndex = 0;
    
    // 0.05秒（50ミリ秒）ごとに写真を切り替える
    slotInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % photoFiles.length;
        slotImage.src = `images/${photoFiles[currentIndex]}`;
    }, 50);
});

// ストップボタンがクリックされたときの処理
stopButton.addEventListener('click', () => {
    // ストップボタンを無効化
    stopButton.disabled = true;
    clearInterval(slotInterval); // 写真の切り替えを停止

    // 確定した写真のインデックスを取得
    const finalPhotoIndex = photoFiles.indexOf(slotImage.src.split('/').pop());
    const finalPhotoFileName = photoFiles[finalPhotoIndex];

    // 抽選結果を表示
    resultDiv.textContent = '抽選完了！';

    // 確定した写真を数秒間強調表示
    slotImage.style.border = '5px solid #FFD700';

    // Xにポストする画像リンクを表示
    postToXLink.style.display = 'block';
    
    // スタートボタンを再度有効化
    setTimeout(() => {
        startButton.disabled = false;
        slotImage.style.border = '5px solid #333';
    }, 2000); // 2秒後に元の状態に戻す
});

// Xにポストする画像リンクがクリックされたときの処理
postToXLink.addEventListener('click', (event) => {
    event.preventDefault(); // <a>タグのデフォルト動作（ページ遷移）をキャンセル

    // ポストするテキストとURLを生成
    // 実際に公開したURLに置き換えてください
    const finalPhotoUrl = window.location.href + 'images/' + slotImage.src.split('/').pop();
    const appUrl = window.location.href; // アプリ自体のURL
    const text = `写真スロットの結果が出ました！\n\n当たったのはこの写真！\n${finalPhotoUrl}\n\nあなたも試してみませんか？\n${appUrl}`;
    
    // URLエンコード
    const tweetTextEncoded = encodeURIComponent(text);
    
    // Xの投稿用URLを生成
    const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetTextEncoded}`;
    
    // 新しいタブでXの投稿画面を開く
    window.open(xShareUrl, '_blank');
});