// ==========================================================
// 🚨 ここを修正してください 🚨
// ==========================================================

// スロットで抽選する画像の開始番号と終了番号を設定
const START_NUMBER = 1; // 例: 1番目の画像から
const END_NUMBER = 13;  // 例: 10番目の画像まで

// ==========================================================
// これより下のコードは変更しないでください
// ==========================================================

const slotImage = document.getElementById('slot-image');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resultDiv = document.getElementById('result');
const postToXLink = document.getElementById('post-to-x-link');

let photoFiles = []; // 連番から生成されたファイル名を格納
let slotInterval;

// 連番から画像ファイル名の配列を生成する
function generatePhotoFiles() {
    if (END_NUMBER < START_NUMBER) {
        console.error('終了番号が開始番号より小さいです。');
        resultDiv.textContent = '設定エラー: 番号を確認してください。';
        return;
    }
    for (let i = START_NUMBER; i <= END_NUMBER; i++) {
        photoFiles.push(`${i}.jpg`);
    }
    console.log('生成されたファイル名:', photoFiles);
}

// ページが読み込まれたら準備開始
window.onload = () => {
    generatePhotoFiles();
    if (photoFiles.length > 0) {
        slotImage.src = `images/${photoFiles[0]}`;
        startButton.disabled = false;
        resultDiv.textContent = '';
    } else {
        resultDiv.textContent = '画像が見つからないか、設定が正しくありません。';
    }
};

// スタートボタンがクリックされたときの処理
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    postToXLink.style.display = 'none';
    resultDiv.textContent = ''; 

    let currentIndex = 0;
    
    slotInterval = setInterval(() => {
        // 連番の配列から画像を切り替え
        currentIndex = (currentIndex + 1) % photoFiles.length;
        slotImage.src = `images/${photoFiles[currentIndex]}`;
    }, 50);
});

// ストップボタンがクリックされたときの処理
stopButton.addEventListener('click', () => {
    stopButton.disabled = true;
    clearInterval(slotInterval); 

    const finalPhotoIndex = photoFiles.indexOf(slotImage.src.split('/').pop());
    const finalPhotoFileName = photoFiles[finalPhotoIndex];

    resultDiv.textContent = '抽選完了！';
    slotImage.style.border = '5px solid #FFD700';
    postToXLink.style.display = 'block';
    
    setTimeout(() => {
        startButton.disabled = false;
        slotImage.style.border = '5px solid #333';
    }, 2000); 
});

// Xにポストする画像リンクがクリックされたときの処理
postToXLink.addEventListener('click', (event) => {
    event.preventDefault();

    const finalPhotoUrl = window.location.href + 'images/' + slotImage.src.split('/').pop();
    const appUrl = window.location.href;
    const text = `写真スロットの結果が出ました！\n\n当たったのはこの写真！\n${finalPhotoUrl}\n\nあなたも試してみませんか？\n${appUrl}`;
    
    const tweetTextEncoded = encodeURIComponent(text);
    const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetTextEncoded}`;
    
    window.open(xShareUrl, '_blank');
});