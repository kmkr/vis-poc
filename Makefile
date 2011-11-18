JOIN_FILE=application.js
TARGET_PATH=public/javascripts
SOURCE_PATH=app/coffee

all: clean build

clean:
	@rm -f $(TARGET_PATH)/$(JOIN_FILE)

build:
	@coffee -j $(TARGET_PATH)/$(JOIN_FILE) -c \
		$(SOURCE_PATH)/models/ \
		$(SOURCE_PATH)/collections/ \
		$(SOURCE_PATH)/views/ \
		$(SOURCE_PATH)/Application.coffee
		
