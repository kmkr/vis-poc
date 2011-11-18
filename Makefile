JOIN_FILE=application.js
TARGET_PATH=public/javascripts

all: clean build

clean:
	@rm -f $(TARGET_PATH)/$(JOIN_FILE)

build:
	@coffee -j $(TARGET_PATH)/$(JOIN_FILE) -c coffee
