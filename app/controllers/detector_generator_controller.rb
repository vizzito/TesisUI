require 'create_file_module.rb'

class DetectorGeneratorController < ApplicationController
  skip_before_action :verify_authenticity_token

  include CreateFileModule
  def index
  end

  def generate
    if (params[:files][0]=="  Select   Add  Delete")
      params[:files].shift
    end
    response = callDetectorService(params[:files])
    @@mapDetector= Hash.new
    @totalAntipatternFound = 0
    @totalSolutionsFound = 0
    @totalAntiPatternMap = Hash.new
    @@globalInfoAntiPattern = Hash.new

    response.each do|nn|
      @dataByFile = Hash.new
      @antiPatternMap = Hash.new
      @antiPatterns = nn["antiPatterns"]
      total = 0
      solutions = 0
      @antiPatterns.each do |a|
        @totalAntipatternFound = @totalAntipatternFound+1
        total = total +1
        code = a["codeName"]
        solution = a["solutionDescription"]
        if(@antiPatternMap[code]==nil)
        @antiPatternMap[code]=1
        else
        @antiPatternMap[code]=@antiPatternMap[code]+1
        end
        if(@totalAntiPatternMap[code]==nil)
        @totalAntiPatternMap[code]=1
        else
        @totalAntiPatternMap[code]=@totalAntiPatternMap[code]+1
        end

        if(!solution.blank?)
          solutions=solutions+1
          @totalSolutionsFound = @totalSolutionsFound+1
        end

        @dataByFile["antiPatterns"]= nn["antiPatterns"]
        @dataByFile["stats"]=@antiPatternMap
        @dataByFile["totalAntiPatterns"]=total
        @dataByFile["totalSolutions"]=solutions
        @@mapDetector[nn["fileName"]]=@dataByFile
      end
    end
   # logger.debug "MAP DETECTOR: "
   # logger.debug @@mapDetector
    
    @@globalInfoAntiPattern["totalAntiPatternFound"] = @totalAntipatternFound
    @@globalInfoAntiPattern["totalSolutionsFound"] = @totalSolutionsFound
    @@globalInfoAntiPattern["totalFilesAnalized"] = params[:files].size
    @@globalInfoAntiPattern["totalAntiPatternMap"] = @totalAntiPatternMap
    @@globalInfoAntiPattern["error"] = @@error
    @@globalInfoAntiPattern["inter"] = @@inter
    @@globalInfoAntiPattern["intra"] = @@intra
    render layout: false,:status => 200
  end

  def getMapDetector
    return @@mapDetector
  end

  def getGlobalPatternInfo
    return @@globalInfoAntiPattern
  end

  def getFileName
    return @@fileName
  end

  def show
    @@fileName = params[:fileName]
    @mapDetector = getMapDetector
    puts "MAP::DETECTOR"
    puts @mapDetector
    @fileName = @@fileName
    render layout: false,:status => 200
  end

  def showChart
    @globalData = getGlobalPatternInfo
    render layout: false,:status => 200
  end

  def showSingleChart
    @fileName = getFileName
    @fileData = getMapDetector
    render layout: false,:status => 200
  end

  def updateParams(bottom,top)
    if @params == nil
      @params = Parametros.new
    @params.bottomsimil = bottom
    @params.topsimil = top
    @params.save
    else
      @params.update(bottomsimil: bottom,topsimil:top)
    end
  end
end
