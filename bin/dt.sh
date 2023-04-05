#!/bin/bash

batch_dir="$(cd "$(dirname "$0")"; pwd -P)"
cd "$batch_dir"
cd ..
batch_dir="$(pwd)"
cd "$batch_dir"
cd "$OLDPWD"
node "$batch_dir/build/dt.js" "$@"
