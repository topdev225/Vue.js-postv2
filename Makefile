GIT_VERSION=$(shell git describe --dirty --always --tags)
TODAY=$(shell date +%Y-%m-%d)
YEAR=$(shell date +%Y)

# First rule is the default
build:
	npm run build

dev:
	npm run dev

version:
	echo "$(TODAY)-$(GIT_VERSION)" > dist/POSTV2-VERSION

package: build version
	tar cfvz postv2-$(TODAY)-$(GIT_VERSION).tgz dist/

clean-package:
	rm -f postv2-*.tgz

dupload: package
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@aws4.streamon.fm:~/postv2/
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@aws5.streamon.fm:~/postv2/
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@aws6.streamon.fm:~/postv2/
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@aws7.streamon.fm:~/postv2/
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@aws14.streamon.fm:~/postv2/

dupload-test: package
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@aws1.streamon.fm:~/postv2/

dupload-stage: package
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@54.80.179.126:~/postv2/
	
dupload-post-live: package
	scp postv2-$(TODAY)-$(GIT_VERSION).tgz ec2-user@ec2-54-80-235-234.compute-1.amazonaws.com:~/postv2/

upload: dupload clean-package

upload-test: dupload-test clean-package

upload-stage: dupload-stage clean-package

upload-post-live: dupload-post-live clean-package

deploy-test: upload-test
	ssh ec2-user@aws1.streamon.fm "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"

deploy-stage: upload-stage
	ssh ec2-user@54.80.179.126 "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"

deploy-post-live: upload-post-live
	ssh ec2-user@ec2-54-80-235-234.compute-1.amazonaws.com "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"

# NOTE: the install.sh in the frontend repo contains instructions for which files to copy where
# on the production server. This may cause problems in the future since knowledge of how to deploy
# is in the wrong repo. Sorry. See frontend/install.sh.
deploy: upload
	ssh ec2-user@aws4.streamon.fm "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"
	ssh ec2-user@aws5.streamon.fm "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"
	ssh ec2-user@aws6.streamon.fm "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"
	ssh ec2-user@aws7.streamon.fm "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"
	ssh ec2-user@aws14.streamon.fm "cd postv2 && rm -rf dist/* && tar xfvz postv2-$(TODAY)-$(GIT_VERSION).tgz && cd ../frontend && sh ./install.sh"

clean: clean-package
	rm -rf dist/*

.PHONY: build dev, version package clean-package dupload upload deploy clean
