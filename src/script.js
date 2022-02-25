/* global tm */

const mainEl = document.querySelector('#container');

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Künstliche Intelligenz lernt wie ein Mensch`,
    description: tm.html`Hier kann die Aufgabenstellung definiert werden.`
  },
  classes: [
    {
      name: "Gefahrzeichen",
      title: "Training: Gefahrzeichen",
      description:tm.html`<ol style='padding:16px'><li>10 Gefahrzeichen aus der Box nehmen.</li><li>Aufnahmetaste gedrückt halten und ca. 20 Aufnahmen pro Schild machen.</li><li>Nach ca. 200 Aufnahmen auf „Weiter“ klicken.</li></ol>`
    },
    {
      name: "Vorschriftzeichen",
      title: "Training: Vorschriftzeichen",
      description:tm.html`<ol style='padding:16px'><li>10 Vorschriftzeichen aus der Box nehmen.</li><li>Aufnahmetaste gedrückt halten und ca. 20 Aufnahmen pro Schild machen.</li><li>Nach ca. 200 Aufnahmen auf „Weiter“ klicken.</li></ol>`
    },
    {
      name: "Richtzeichen",
      title: "Training: Richtzeichen",
      description:tm.html`<ol style='padding:16px'><li>10 Richtzeichen aus der Box nehmen.</li><li>Aufnahmetaste gedrückt halten und ca. 20 Aufnahmen pro Schild machen.</li><li>Nach ca. 200 Aufnahmen auf „Weiter“ klicken.</li></ol>`
    },
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
