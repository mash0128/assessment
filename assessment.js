'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

//bottun
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        return;
    }


//text
    resultDivision.innerText = ''; 
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivision.appendChild(header);

    const paragragh = document.createElement('p');
    const result = assessment(userName);
    paragragh.innerText = result;
    resultDivision.appendChild(paragragh);

//tweetzone
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
     encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.setAttribute('class','twitter-hashtag-button');
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
}
userNameInput.onkeydown = event => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};

//sentence
const answers = [
    '@のいいところは喉！君の声は私の語彙力がないから表現が難しいけどなんか人を惹きつけてくれるみたいだよ！',
    '@のいいところは脳みそ！ユニークな発想や今まで培った知識でパワーを発揮しているよ！',
    '@のいいところは熱意！好きなことにはなんでもやり切る力を持っているからすごいなって思うよ！',
    '@いいところは探究心！知りたいことはなんでも知ろうとするからいつか活かせる時がくるとすごい力を発揮する気がするよ！',
    '@のいいところは見た目！目の保養になっているから知らずにたくさんの人を助けているよ！',
    '@のいいところはコミュ力が高いところ！たくさんの人と話したりしているからどの人からも好かれていているよ！',
    '@のいいところは優しいところ！気にかけてもらえるから色んな人から感謝されているよ！',
    '@のいいところは行動力！迷うことなく決めたら動いているから勇気を分けて欲しいと思うよ！',
    '@のいいところは忍耐力があるところ！耐えながらもいつかはチャンスを掴んで羽ばたいているから尊敬しているよ！',
    '@のいいところは笑顔！いつもみんなに幸せを振り撒いているから世界平和に貢献しているよ！',
]

//assessmentzone
function assessment(userName){
    let sumOfCharCode = 0;
    for(let i = 0;i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('@',userName);
    return result;
}

//test
console.assert(
    assessment('え') ===
    'えのいいところは喉！君の声は私の語彙力がないから表現が難しいけどなんか人を惹きつけてくれるみたいだよ！',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
