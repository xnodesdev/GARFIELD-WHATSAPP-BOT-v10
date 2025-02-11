const cheerio = require('cheerio');

const ytv = async (yutub) => {
    const post = async (url, formdata) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                accept: "*/*",
                'accept-language': "en-US,en;q=0.9",
                'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(Object.entries(formdata))
        });
        return response;
    };

    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
    const ytId = ytIdRegex.exec(yutub);
    const url = 'https://youtu.be/' + ytId[1];
    const res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
        url,
        q_auto: 0,
        ajax: 1
    });
    const mela = await res.json();
    const $ = cheerio.load(typeof mela.result === 'string' ? mela.result : JSON.stringify(mela.result));
    const hasil = [];
    const thumb = $('div').find('.thumbnail.cover > a > img').attr('src');
    const title = $('div').find('.thumbnail.cover > div > b').text();
    const quality = $('div').find('#mp4 > table > tbody > tr:nth-child(4) > td:nth-child(3) > a').attr('data-fquality');
    const tipe = $('div').find('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(3) > a').attr('data-ftype');
    const output = `${title}.` + tipe;
    const size = $('div').find('#mp4 > table > tbody > tr:nth-child(2) > td:nth-child(2)').text();
    const id = /var k__id = "(.*?)"/.exec(mela.result)[1];
    const res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
        type: 'youtube',
        _id: id,
        v_id: ytId[1],
        ajax: '1',
        token: '',
        ftype: tipe,
        fquality: quality
    });
    const meme = await res2.json();
    const supp = cheerio.load(typeof meme.result === 'string' ? meme.result : JSON.stringify(meme.result));
    const link = supp('div').find('a').attr('href');
    hasil.push({ thumb, title, quality, tipe, size, output, link });
    return hasil[0];
}

const yta = async (yutub) => {
    const post = async (url, formdata) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                accept: "*/*",
                'accept-language': "en-US,en;q=0.9",
                'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(Object.entries(formdata))
        });
        return response;
    };

    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/;
    const ytId = ytIdRegex.exec(yutub);
    const url = 'https://youtu.be/' + ytId[1];
    const res = await post(`https://www.y2mate.com/mates/en68/analyze/ajax`, {
        url,
        q_auto: 0,
        ajax: 1
    });
    const mela = await res.json();
    const $ = cheerio.load(typeof mela.result === 'string' ? mela.result : JSON.stringify(mela.result));
    const hasil = [];
    const thumb = $('div').find('.thumbnail.cover > a > img').attr('src');
    const title = $('div').find('.thumbnail.cover > div > b').text();
    const size = $('div').find('#mp3 > table > tbody > tr > td:nth-child(2)').text();
    const tipe = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype');
    const output = `${title}.` + tipe;
    const quality = $('div').find('#mp3 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality');
    const id = /var k__id = "(.*?)"/.exec(mela.result)[1];
    const res2 = await post(`https://www.y2mate.com/mates/en68/convert`, {
        type: 'youtube',
        _id: id,
        v_id: ytId[1],
        ajax: '1',
        token: '',
        ftype: tipe,
        fquality: quality
    });
    const meme = await res2.json();
    const supp = cheerio.load(typeof meme.result === 'string' ? meme.result : JSON.stringify(meme.result));
    const link = supp('div').find('a').attr('href');
    hasil.push({ thumb, title, quality, tipe, size, output, link });
    return hasil[0];
}

module.exports = {
    yta,
    ytv
}
/*
by https://instabio.cc/fg98ff
