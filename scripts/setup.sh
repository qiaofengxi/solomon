# install dependencies

yarn

# copy assets files

assets=( favicon.ico icon.png fonts )

for i in "${assets[@]}"
do
	cp public/$i ng/src/$1 -r
	cp public/$i react/public/$1 -r
done

# render markdown

yarn generate:post
yarn generate:rss

# copy json & html to React directory

cp public/post.json react/src/post.json
cp -R public/html react/public/html

# copy json & html to Angular directory

cp public/post.json ng/src/post.json
cp -R public/html ng/src/html
