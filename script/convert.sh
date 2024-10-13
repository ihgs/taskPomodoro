sizes=(192 256 384 512)
for size in ${sizes[@]}
do
    convert -geometry ${size}x${size} icon.png icon-${size}x${size}.png
done
convert icon.png -define icon:auto-resize=64,48,32,16 favicon.ico
