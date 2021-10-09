# API-Memes
An REST API full of varied memes in Spanish. Simple.

![](memes_mini.jpg)

## Images List: /files/jpg
Example response: {"response":["Array String"],"urlresource":null,"httpstatus":200}

## Videos List: /files/mp4
Example response: {"response":["Array String"],"urlresource":null,"httpstatus":200}

## Images Access: /files/jpg/*name.jpg*
Example response: IMAGE JPG OR PNG

## Videos Access: /files/mp4/*name.mp4*
Example response: VIDEO MP4

## Image Access (Random): /files/random/jpg
Example response:{"response":null,"urlresource":"random-name.jpg","httpstatus":200}

## Video Access (Random): /files/random/mp4
Example response:{"response":null,"urlresource":"random-name.mp4","httpstatus":200}
