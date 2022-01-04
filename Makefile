publish-docker:
		docker build . -t react-kratos-ui
		docker image tag react-kratos-ui:latest registry.usw.co/uswitch/react-kratos-ui:latest
		docker image push registry.usw.co/uswitch/react-kratos-ui:latest