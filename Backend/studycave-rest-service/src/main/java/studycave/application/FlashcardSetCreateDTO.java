package studycave.application;
import com.fasterxml.jackson.annotation.JsonProperty;


public class FlashcardSetCreateDTO {

	@JsonProperty("left_side")
    private String leftSide;
	@JsonProperty("right_side")
    private String rightSide;
	
    protected FlashcardSetCreateDTO() {}

    public FlashcardSetCreateDTO(String firstName, String lastName) {
        this.leftSide = firstName;
        this.rightSide = lastName;
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
