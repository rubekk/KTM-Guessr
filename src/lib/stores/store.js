import { writable } from  "svelte/store";

export let canShowShare=writable(false);

export let canShowWhat=writable(false);

export let totalScore=writable(0);

export const data=writable([
    {
        name: "Lalitpur Metropolitan City",
        coords: [27.676212, 85.317288],
        iframeURL: "https://www.google.com/maps/embed?pb=!4v1682101010756!6m8!1m7!1sCAoSLEFGMVFpcE0zMjZ5cGhOZHRianNHUXB3MVpRbEtoNlM1bERmakU3aEZPbjhy!2m2!1d27.6761384!2d85.3172617!3f258.3248906657699!4f0!5f0.7820865974627469"
    },
    {
        name: "Chilancho",
        coords: [27.676931, 85.278050],
        iframeURL: "https://www.google.com/maps/embed?pb=!4v1682101166970!6m8!1m7!1sCAoSLEFGMVFpcFAxdjVKTmtDNjhOLVRuTWV3N3J1X1l6OWxIa3FhTXY0ZjJQSF9X!2m2!1d27.6769406!2d85.2781408!3f101.60318781110252!4f-8.00313069916119!5f0.7820865974627469"
    },
    {
        name: "Shantaneshwor Mahadev",
        coords: [27.615461, 85.344263],
        iframeURL: "https://www.google.com/maps/embed?pb=!4v1682101253935!6m8!1m7!1sCAoSLEFGMVFpcE40MnduMmFzZGIwT2NZYUtmNF9OWG5PWHlBZnpoQWoxUzV4LWNG!2m2!1d27.6154188!2d85.3442127!3f65.98842521944646!4f3.118903058790025!5f0.7820865974627469"
    },
    {
        name: "Lagankhel",
        coords: [27.6669333,85.3226411],
        iframeURL: "https://www.google.com/maps/embed?pb=!4v1682101380124!6m8!1m7!1sCAoSLEFGMVFpcE5sMGtaZ3QyaHdudG42N1J6OEV1MHkzWnpoTUt3cjlQbkF6SWpp!2m2!1d27.6669333!2d85.32264110000001!3f10.034015969202205!4f-6.059134748819602!5f0.7820865974627469"
    },
    {
        name: "Dasarath Rangashala",
        coords: [27.695077,85.314829],
        iframeURL: "https://www.google.com/maps/embed?pb=!4v1682101568510!6m8!1m7!1sCAoSLEFGMVFpcE1hd0JHUXFvVXROMXlpN2tqXzNoTkpaWDRBb2xkSS1fLWFxXzg3!2m2!1d27.695077!2d85.314829!3f206.3015329385111!4f-10.19912790635155!5f0.7820865974627469"
    }
]);

export let currIframeURL=writable("");