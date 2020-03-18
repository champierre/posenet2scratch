#!/bin/sh

LF=$(printf '\\\012_')
LF=${LF%_}

mkdir -p node_modules/scratch-vm/src/extensions/scratch3_posenet2scratch
cp posenet2scratch/scratch-vm/src/extensions/scratch3_posenet2scratch/index.js node_modules/scratch-vm/src/extensions/scratch3_posenet2scratch/
wget -P node_modules/scratch-vm/src/extensions https://unpkg.com/ml5@0.4.3/dist/ml5.min.js
mv node_modules/scratch-vm/src/extension-support/extension-manager.js node_modules/scratch-vm/src/extension-support/extension-manager.js_orig
sed -e "s|class ExtensionManager {$|builtinExtensions['posenet2scratch'] = () => require('../extensions/scratch3_posenet2scratch');${LF}${LF}class ExtensionManager {|g" node_modules/scratch-vm/src/extension-support/extension-manager.js_orig > node_modules/scratch-vm/src/extension-support/extension-manager.js

mkdir -p src/lib/libraries/extensions/posenet2scratch
cp posenet2scratch/scratch-gui/src/lib/libraries/extensions/posenet2scratch/posenet2scratch.png src/lib/libraries/extensions/posenet2scratch/
cp posenet2scratch/scratch-gui/src/lib/libraries/extensions/posenet2scratch/posenet2scratch-small.png src/lib/libraries/extensions/posenet2scratch/
mv src/lib/libraries/extensions/index.jsx src/lib/libraries/extensions/index.jsx_orig
POSENET2SCRATCH="\
    {${LF}\
        name: 'Posenet2Scratch',${LF}\
        extensionId: 'posenet2scratch',${LF}\
        collaborator: 'champierre',${LF}\
        iconURL: posenet2scratchIconURL,${LF}\
        insetIconURL: posenet2scratchInsetIconURL,${LF}\
        description: (${LF}\
            <FormattedMessage${LF}\
                defaultMessage='PoseNet2Scratch Blocks.'${LF}\
                description='PoseNet2Scratch Blocks'${LF}\
                id='gui.extension.posenet2scratchblocks.description'${LF}\
            />${LF}\
        ),${LF}\
        featured: true,${LF}\
        disabled: false,${LF}\
        internetConnectionRequired: true,${LF}\
        bluetoothRequired: false,${LF}\
        helpLink: 'https://champierre.github.io/posenet2scratch/'${LF}\
    },"
sed -e "s|^export default \[$|import posenet2scratchIconURL from './posenet2scratch/posenet2scratch.png';${LF}import posenet2scratchInsetIconURL from './posenet2scratch/posenet2scratch-small.png';${LF}${LF}export default [${LF}${POSENET2SCRATCH}|g" src/lib/libraries/extensions/index.jsx_orig > src/lib/libraries/extensions/index.jsx
