library(RCurl)
library(XML)
library(rvest)

getLinks <- function(url) {
  res <- read_html(url) %>% html_nodes("a") %>% html_attr("href")
}

url <- "https://en.wikipedia.org/?title=R_%28programming_language%29"

rawlinks <- getLinks(url)

dataList <- rawlinks %>% data.frame()

View(dataList)
