var fs = require('fs');
var mime = require('mime');
var request = require('request');

var file = 'Imagem 1.zip'; // Filename you want to upload on your local PC
var onedrive_folder = '/'; // Folder name on OneDrive
var onedrive_filename = 'Imagem 1.zip'; // Filename on OneDrive

function start() {
    console.log('Iniciado');

    request.post({
        url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        form: {
            redirect_uri: 'http://localhost/dashboard',
            client_id: '',
            client_secret: 'onedrive_client_secret',
            refresh_token: onedrive_refresh_token,
            grant_type: 'refresh_token'
        },
    }, function(error, response, body) {
        fs.readFile(file, function read(e, f) {
            request.put({
                url: 'https://graph.microsoft.com/v1.0/drive/root:/' + onedrive_folder + '/' + onedrive_filename + ':/content',
                headers: {
                    'Authorization': "Bearer " + JSON.parse(body).access_token,
                    'Content-Type': mime.lookup(file),
                },
                body: f,
            }, function(er, re, bo) {
                console.log(bo);
            });
        });
    });

}

start();