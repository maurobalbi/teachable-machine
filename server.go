package main

import (
	"embed"
	"flag"
	"io/fs"
	"log"
	"net/http"
	"os/exec"
)

//go:embed src
var src embed.FS

func server(finished chan bool) {
	subFS, _ := fs.Sub(src, "src")

	http.Handle("/", http.FileServer(http.FS(subFS)))
	port := flag.String("p", "8100", "port to serve on")
	log.Printf("Serving on HTTP port: %s\n", *port)
	err := http.ListenAndServe(":"+*port, nil)

	log.Printf(err.Error())

	finished <- true
}

func main() {
	errored := make(chan bool)

	go server(errored)

	const url = "http://localhost:8100"

	_ = exec.Command("xdg-open", url).Start()
	log.Printf("Opening Browser")
	<-errored
	log.Printf("Closing")
}
