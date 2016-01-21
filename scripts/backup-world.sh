#!/bin/bash

set -e

show_help() {
cat << EOF
Usage: ${0##*/} -n VOLUME_NAME -s S3_BUCKET
Create an incremental backup from canvoy volume and upload it to S3

    -n VOLUME_NAME  volume name from canvoy
    -s S3_BUCKET    S3 URI with region. e.g. s3://bucket@eu-central-1/

EOF
}


while getopts "n:s:" opt; do
    case "$opt" in
    n)  name=$OPTARG
        ;;
    s)  s3=$OPTARG
        ;;
    esac
done

if [[ -z "$name" || -z "$s3" ]]; then
  show_help
  exit 1
fi

echo $name $s3

cur_date=$(date +%Y%m%d_%H%M%S)
snapshot=$(convoy snapshot create $name)
convoy backup create $snapshot --dest $s3

echo Done