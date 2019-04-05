.PHONY: default generate

default: generate

generate:
	rm -rf dist/dist_gen.go
	go generate ./dist/dist.go
	gofmt -s -w dist
