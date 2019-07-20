# PoseNet2Scratch

*Read this in other languages: [English](README.md), [日本語](README.ja.md)*

PoseNet2Scratch can detect human pose and add special Scratch blocks that can get x and y position of each part of the body.

It uses [PoseNet](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5), a machine learning model , for Real-time Human Pose Estimation. [ml5.js](https://ml5js.org/), a JavaScript library for machine learning, is used to connect it with Scratch 3.

<p>

<img src="images/posenet.gif" width="400" />

<img src="images/posenet2.gif" width="400" />

</p>

Try [the customized Scratch 3](https://champierre.github.io/scratch/) that has PoseNet2Scratch as an extension.

If you make a project with using PoseNet2Scratch, please share it with hashtag: **#posenet2scratch**.

## Sample Usage

1. Open https://champierre.github.io/scratch/ on a browser(Chrome is recommended).

2. Click "Add Extension" button(Folder with "+" mark icon).
<img src="images/en/extension.png" width="400" />

3. Select "PoseNet2Scratch" extension.
<img src="images/en/posenet_extension.png" width="400" />

4. You can use PoseNet2Scratch blocks.
<img src="images/en/posenet2scratch_blocks.png" width="400" />

5. Select "Video Sensing" extension, if you want to see the image captured by webcam on the stage screen. This is not mandatory.
<img src="images/en/video_sensing.png" width="400" />

6. Add "Glasses" sprite.
<img src="images/en/glasses.png" width="400" />

7. Make a code like below.
<img src="images/en/blocks.png" width="400" />

8. You will have the glasses shown at the center of your face(x position of the nose) and at the hight of your eyes(y position of the left eye).
<img src="images/en/face.png" width="400" />
