cd $(dirname $0)
sh ./core/build.sh
sh ./factory/build.sh
npx zshy -p tsconfig.json