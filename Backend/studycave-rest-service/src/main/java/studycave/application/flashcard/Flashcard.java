package studycave.application.flashcard;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;

@Entity 
@Table(name = "flashcard") 
public class Flashcard {
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	@Column(name="left_side")
	@JsonProperty("left_side")
    private String leftSide;
	@Column(name="right_side")
	@JsonProperty("right_side")
    private String rightSide;

    @ManyToOne
    @JoinColumn(name="id_set",referencedColumnName="id")
    @ApiModelProperty(hidden = true)
    @JsonBackReference
    private Set flashcardSet;
	
    public Flashcard() {}

    public Flashcard(String firstName, String lastName) {
        this.leftSide = firstName;
        this.rightSide = lastName;
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

	public Set getFlashcardSet() {
		return flashcardSet;
	}

	public void setFlashcardSet(Set flashcardSet) {
		this.flashcardSet = flashcardSet;
	}
	
	
    
    
}
