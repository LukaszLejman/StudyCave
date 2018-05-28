package studycave.application.test;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.annotations.ApiModelProperty;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Answer {
	@Id
	@Column(name="id_ans")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	
    @ApiModelProperty(hidden = true)
    @ManyToOne
    @JoinColumn(name="id_question",referencedColumnName="id")
    @JsonBackReference
    private Question question;
    
    public Answer() {

    }
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}
    
}
