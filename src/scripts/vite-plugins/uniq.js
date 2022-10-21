const cheerio = require('cheerio')

const instances = []

exports.VitePluginUniq = function VitePluginUniq() {
  return {
    name: 'vite-plugin-uniq',
    transformIndexHtml: (html) => {
      const $ = cheerio.load(html)

      return '<html></html>'

      $('data-uniq').each(function () {
        const a = this.attribs['data-uniq']
        if (instances.includes(a)) $(this).remove()
        else instances.push(a)
      })
      return $.html()
    },
  }
}

