const fs = require('fs')
const glob = require('glob')
const cheerio = require('cheerio')

glob('./dist/**/*.html', {}, (err, files)=>{

  for (let file of files) {
    const html = fs.readFileSync(file, {encoding: 'utf8'})
    const $ = cheerio.load(html)
    const instances = []

    $('[data-uniq]').each(function () {
      const a = this.attribs['data-uniq']
      if (instances.includes(a)) $(this).remove()
      else instances.push(a)
    })

    $('link[rel="stylesheet"]').remove()

    fs.writeFileSync(file, $.html(), {encoding: 'utf8'})
  }
})
