package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed src
var src embed.FS

func server(finished chan bool) {
	subFS, _ := fs.Sub(src, "src")

	http.Handle("/", http.FileServer(http.FS(subFS)))
	log.Printf("Bitte gebe im Browser (Chrome) folgende Adresse ein: http://localhost:8100\n")
	err := http.ListenAndServe(":8100", nil)

	log.Printf(err.Error())

	finished <- true
}

func main() {
	errored := make(chan bool)

	go server(errored)

	const url = "http://localhost:8100"

	<-errored
	log.Printf("Server wird geschlossen")
}
