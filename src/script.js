/* global tm */

const mainEl = document.querySelector('#container');

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Künstliche Intelligenz lernt wie ein Mensch`,
    description: tm.html`Hier kann die Aufgabenstellung definiert werden.`
  },
  classes: [
    {
      name: "Tempo 60",
      title: "Training: Zulässige Höchstgeschwindigkeit",
      description:
        `Zeige dem Modell das Schild mit der Geschwindigkeitsbegrenzung und halte die "Aufnehmen"-Taste gedrückt (mindestens 20 Bilder)`
    },
    {
      name: "Vorfahrt gewähren",
      title: "Training: Vorfahrt gewähren",
      description:
        `Zeige dem Modell das Schild "Vorfahrt gewähren" und halte erneut die "Aufnehmen"-Taste gedrückt (mindestens 20 Bilder)`
    },
    {
      name: "STOP",
      title: "Training: Stoppschild",
      description:
        `Zeige dem Modell das Schild "Vorfahrt gewähren" und halte wieder die "Aufnehmen"-Taste gedrückt (mindestens 20 Bilder)`
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll('.prediction-image');
    let highestProb = Number.MIN_VALUE;
    let highestIndex = -1;
    predictions.forEach((pred, i) => {
      if (pred.probability > highestProb) {
        highestProb = pred.probability;
        highestIndex = i;
      }
    });
    images.forEach((img, i) => {
      if (i === highestIndex) {
        img.classList.remove('hidden');
      } else {
        img.classList.add('hidden');
      }
    });
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onReady: () => {
    // const inferenceCamera = wizard.createInferenceCamera({
    //   size: 270
    // });
    // const cameraContainer = document.querySelector('#inference-camera-container');
    // cameraContainer.appendChild(inferenceCamera);
    // mainEl.classList.add('ready');
  }
});

document.querySelector('#train-model-button').addEventListener('click', () => wizard.open());
