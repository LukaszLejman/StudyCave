package studycave.application.test;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DiscriminatorFormula;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo.*;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import io.swagger.annotations.ApiModelProperty;



//
//@DiscriminatorFormula("case when type in ('true-false', 'single-choice', 'multiple-choice') then 1 when 'pairs' then 2 when 'puzzle' then 3 when 'gaps' then 4 else 5 end")
@JsonTypeInfo(use=JsonTypeInfo.Id.NAME, include=As.PROPERTY, property = "type", visible = true )
@JsonSubTypes({
	@JsonSubTypes.Type(value = QuestionChoices.class, name="choices"),
	@JsonSubTypes.Type(value = QuestionPairs.class, name="pairs"),
	@JsonSubTypes.Type(value = QuestionPuzzle.class, name="puzzle"),
	@JsonSubTypes.Type(value = QuestionGaps.class, name="gaps")
})
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Question {
    
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="question")
    @JsonProperty("question")
    private String text;

    @Column(name="nr_question")
    @JsonProperty("nr")
    private int nrQuestion;
    //@NotNull
    protected String type;
    private int points;

	@ApiModelProperty(hidden = true)
    @ManyToOne
    @JoinColumn(name="id_test",referencedColumnName="id")
    @JsonBackReference
    private Test test;

	public Question() {
		super();
	}

	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public int getNrQuestion() {
		return nrQuestion;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int isNrQuestion() {
		return nrQuestion;
	}

	public void setNrQuestion(int nrQuestion) {
		this.nrQuestion = nrQuestion;
	}

	public Test getTest() {
		return test;
	}

	public void setTest(Test test) {
		this.test = test;
	}   
	
    public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

/*
	public List<Answer> getAnswers() {
		return answers;
	}


	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
*/	
	
}
