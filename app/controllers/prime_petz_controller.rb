class PrimePetzController < ApplicationController

  def home
    @listings=Listing.where(:is_active=>true).order("created_at DESC").all.limit(4)
    @layoutType="grid".to_json
  end

  def about
  end

  def contact
  end

end
