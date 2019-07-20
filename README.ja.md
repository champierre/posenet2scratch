# PoseNet2Scratch

*Read this in other languages: [English](README.md), [日本語](README.ja.md)*

PoseNet2Scratchは人の姿勢を検出し、身体の各部分のxとyの位置を取得できるScratch拡張ブロックを追加することができます。

リアルタイムの姿勢検出をおこなうために[PoseNet](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5)を使っています。Kinectのような特別なデバイスを使うことなく、普通のウェブカメラで素早く高精度で検出できるところが大きな特徴です。

また、Scratch 3の拡張機能として利用できるように、機械学習用JavaScriptライブラリ[ml5.js](https://ml5js.org/)を使用して実装しています。

<img src="images/posenet.gif" width="400" />

PoseNet2Scratchは、[独自バージョンのScratch 3](https://champierre.github.io/scratch/)で実際に体験できます。

PoseNet2Scratchを使用してプロジェクトを作成したら、ぜひハッシュタグ**＃posenet2scratch**でシェアしてください。

## 使用例

1. ブラウザで https://champierre.github.io/scratch/ を開きます（Chrome推奨）。

2. 「拡張機能を追加」ボタン（+が付いたフォルダのアイコン）をクリックします。
<img src="images/ja/extension.png" width="400" />

3. 「PoseNet2Scratch」拡張機能を選択します。
<img src="images/ja/posenet_extension.png" width="400" />

4. PoseNet2Scratchのブロックを使用できます。
<img src="images/ja/posenet2scratch_blocks.png" width="400" />

5. ウェブカメラでキャプチャした画像をステージ画面に表示するには、「Video Sensing」拡張機能を選択します。これは必須ではありません。
<img src = "images/ja/video_sensing.png" width = "400" />

6. 「Glasses」(眼鏡)スプライトを追加します。
<img src="images/ja/glasses.png" width="400" />

7. 以下のようなコードを作ります。
<img src="images/ja/blocks.png" width="400" />

8. 顔の中央（鼻のx位置）と目の高さ（左目のy位置）に眼鏡が表示されます。
<img src="images/ja/face.png" width="400" />
