package studycave.application.test;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class AnswerPairs {
	@Id
	@Column(name="id_ans")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String first;
    private String second;
    
    @ApiModelProperty(hidden = true)
    @ManyToOne
    @JoinColumn(name="id_question",referencedColumnName="id")
    @JsonBackReference
    private Question question;

    public AnswerPairs() {
    	super();
    }
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirst() {
		return first;
	}

	public void setFirst(String first) {
		this.first = first;
	}

	public String getSecond() {
		return second;
	}

	public void setSecond(String second) {
		this.second = second;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}
    
}
