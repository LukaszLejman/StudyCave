package studycave.application;

import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;

public class FlashcardSetCreateDTO {

	@JsonProperty("left_side")
    private String leftSide;
	@JsonProperty("right_side")
    private String rightSide;

    @ManyToOne
    @ApiModelProperty(hidden = true)
    @JsonBackReference
    private SetCreateDTO flashcardSet;
	
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

	public SetCreateDTO getFlashcardSet() {
		return flashcardSet;
	}

	public void setFlashcardSet(SetCreateDTO flashcardSet) {
		this.flashcardSet = flashcardSet;
	}
}
