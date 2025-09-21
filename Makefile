# Makefile for Jopar Site

# 变量定义
PORT ?= 3217
HOST ?= localhost
BUILD_DIR ?= dist
SRC_DIR ?= .

# 默认目标
.PHONY: help
help: ## 显示帮助信息
	@echo "可用的命令:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# 开发服务器
.PHONY: start-service
start-service: ## 启动开发服务器
	@echo "启动开发服务器在 http://$(HOST):$(PORT)"
	serve -s $(SRC_DIR) -l $(PORT)

# 默认目标
.DEFAULT_GOAL := help
