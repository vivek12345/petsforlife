class PrimePetzController < ApplicationController
	
  def home
    @listings=Listing.all.limit(4)
    @layoutType="grid".to_json
  end

  def about
  	
  end

  def contact
  end

  
end
