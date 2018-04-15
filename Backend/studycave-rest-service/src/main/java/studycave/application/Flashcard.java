package studycave.application;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity 
@Table(name = "flashcard") 
public class Flashcard {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
//	@Column(name="id_set")
//    private Long id_set;
	@Column(name="left_side")
	@JsonProperty("left_side")
    private String leftSide;
	@Column(name="right_side")
	@JsonProperty("right_side")
    private String rightSide;

    @ManyToOne(cascade= CascadeType.ALL)
    @JoinColumn(name="id_set",referencedColumnName="id",nullable=false,unique=true)
    private Set flashcardSet;
	
    protected Flashcard() {}

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
    
    
}
