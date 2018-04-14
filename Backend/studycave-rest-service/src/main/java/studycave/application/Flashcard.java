package studycave.application;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity 
public class Flashcard {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
	@Column(name="left_side")
    private String leftSide;
	@Column(name="right_side")
    private String rightSide;

    protected Flashcard() {}

    public Flashcard(String firstName, String lastName) {
        this.leftSide = firstName;
        this.rightSide = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "Customer[id=%d, firstName='%s', lastName='%s']",
                id, leftSide, rightSide);
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
