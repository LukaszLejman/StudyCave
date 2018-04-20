package studycave.application;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FlashcardTestDTO {
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonProperty("left_side")
    private String leftSide;
    @JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonProperty("right_side")
    private String rightSide;
    
    public FlashcardTestDTO() {
    	
    }
    

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getLeftSide() {
		return leftSide;
	}

	public void setLeftSide(String leftSide) {
		this.leftSide = leftSide;
	}

	public String getRightSide() {
		return rightSide;
	}

	public void setRightSide(String rightSide) {
		this.rightSide = rightSide;
	}


    
	
    
}
