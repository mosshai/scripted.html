require 'digest'

module Multilang
  def block_code(code, full_lang_name)
    if full_lang_name == 'ecmascript'
      ts = super(code, 'typescript').sub("highlight typescript") do |match|
        match + " tab-typescript"
      end
      js = super(code, 'javascript').sub("highlight javascript") do |match|
        match + " tab-javascript"
      end
      ts + js
    elsif full_lang_name == 'transpilescript'
      # super('console.log("FoO");', 'javascript') 
      ts = super(code, 'typescript').sub("highlight typescript") do |match|
        match + " tab-typescript"
      end

      # File.open('scrypted/typescript.ts', 'w') { |file| file.write(code) }
      # Dir.chdir('scrypted') {
      #   system('tsc -t ES2018 -m ES6 typescript.ts')
      # }
      # jscode = File.read('scrypted/typescript.js')
      # js = super(jscode, 'javascript').sub("highlight javascript") do |match|
      #   match + " tab-javascript"
      # end
      
      
      # return ts + js

      md5 = Digest::MD5.new
      md5.update code
      hex = md5.hexdigest
      devDir = '/tmp/developer.scrypted.app'
      hexTs = "#{devDir}/#{hex}.ts"
      hexJs = "#{devDir}/#{hex}.js"
      FileUtils.mkdir_p devDir
      if (!File.file?(hexJs))
        File.open(hexTs, 'w') { |file| file.write(code) }
        Dir.chdir(devDir) {
          system("tsc -t ES2018 -m ES6 #{hexTs}")
        }
      end

      jscode = File.read(hexJs)
      js = super(jscode, 'javascript').sub("highlight javascript") do |match|
        match + " tab-javascript"
      end

      ts + js
    elsif full_lang_name
      parts = full_lang_name.split('--')
      rouge_lang_name = (parts) ? parts[0] : "" # just parts[0] here causes null ref exception when no language specified
      super(code, rouge_lang_name).sub("highlight #{rouge_lang_name}") do |match|
        match + " tab-" + full_lang_name
      end
    else
      super(code, full_lang_name)
    end
  end
end

require 'middleman-core/renderers/redcarpet'
Middleman::Renderers::MiddlemanRedcarpetHTML.send :include, Multilang
