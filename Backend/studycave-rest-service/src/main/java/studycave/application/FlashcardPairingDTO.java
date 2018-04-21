package studycave.application;



import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FlashcardPairingDTO {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long id;
	@JsonProperty("left_side")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String leftSide;
    @JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonProperty("right_side")
    private String rightSide;
    
    
    
    
	public FlashcardPairingDTO() {}
	public FlashcardPairingDTO(long id, String left) {
		this.id=id;
		this.leftSide=left;
	}
	public FlashcardPairingDTO(String right) {
		this.rightSide=right;
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
