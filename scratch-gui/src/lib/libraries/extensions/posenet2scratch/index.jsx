import React from 'react';
import {FormattedMessage} from 'react-intl';

import posenet2scratchIconURL from './posenet2scratch.png';
import posenet2scratchInsetIconURL from './posenet2scratch-small.png';

const translationMap = {
    'ja': {
        'gui.extension.posenet2scratch.description': '身体の各部分の座標を取得する。'
    },
    'ja-Hira': {
        'gui.extension.posenet2scratch.description': 'からだのかくぶぶんのざひょうをしゅとくする。'
    }
};

const entry = {
    name: 'posenet2Scratch',
    extensionId: 'posenet2scratch',
    extensionURL: 'https://champierre.github.io/posenet2scratch/posenet2scratch.mjs',
    collaborator: 'champierre',
    iconURL: posenet2scratchIconURL,
    insetIconURL: posenet2scratchInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Obtain the coordinates of each part of the body."
            description="Description for PoseNet2Scratch Blocks."
            id="gui.extension.posenet2scratch.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/champierre/posenet2scratch/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
