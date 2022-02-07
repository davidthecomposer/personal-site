import React, {
  useEffect,
  useRef,
  useReducer,
  useContext,
  useState,
} from "react"
import styled from "styled-components"
import text from "assets/styles/text"
import { MobileContext } from "components/ContextStore"
import colors from "assets/styles/colors"
import media from "assets/styles/media"
import MainButton from "./buttons/MainButton"
import gsap from "gsap"

const ContactForm: React.FC<{
  enter: boolean
  topVal: string
  leftVal: string
  leftValT: string
  topValT: string
  setEnter: any
  close?: boolean
}> = ({ enter, leftVal, topVal, setEnter, close, leftValT, topValT }) => {
  const form = useRef<HTMLFormElement>(null)
  const mobile = useContext(MobileContext)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useReducer(
    (
      state: { name: string; email: string; project: string },
      newState: { name: string; email: string; project: string }
    ) => ({ ...state, ...newState }),
    {
      name: "",
      email: "",
      project: "",
    }
  )

  const updateFormState = (e: any) => {
    const name = e.target.name
    let newValue = e.target.value
    //@ts-ignore
    setFormData({ [name]: newValue })
  }

  useEffect(() => {
    if (form.current) {
      console.log(enter)
      const tl = gsap.timeline()
      if (enter) {
        tl.to(form.current, { scale: 1, duration: 0 }, 0).to(
          form.current,
          { opacity: 1, y: 0, duration: 0.6 },
          0.1
        )
      } else {
        tl.to(form.current, { scale: 0, y: "100px", duration: 0 }, 0.6).to(
          form.current,
          { opacity: 0, duration: 0.6 },
          0
        )
      }
    }
  }, [enter])

  const closeModal = (e: any) => {
    e.preventDefault()
    setEnter(!enter)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (form.current) {
      let myForm = form.current
      let formData = new FormData(myForm)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        //@ts-ignore
        body: new URLSearchParams(formData).toString(),
      })
        .then(response => {
          if (response.ok) {
            setFormData({
              name: "",
              email: "",
              project: "",
            })
            setSuccess(true)
          } else {
          }
        })
        .catch(error => alert(error))
    }
  }

  return (
    <FormModal
      ref={form}
      topValT={topValT}
      leftValT={leftValT}
      leftVal={leftVal}
      topVal={topVal}
      enter={enter}
      data-netlify="true"
      name="connect-form"
      id="music-form"
      onSubmit={handleSubmit}
    >
      <Wrapper success={success}>
        <FormRow>
          <FormText htmlFor="name">Name :</FormText>
          <TextInput
            type="text"
            id="name"
            name="name"
            placeholder="name"
            //@ts-ignore

            value={formData.name}
            onChange={(e: any) => updateFormState(e)}
          />
        </FormRow>
        <FormRow>
          <FormText htmlFor="email">Email :</FormText>
          <TextInput
            type="email"
            id="email"
            name="email"
            //@ts-ignore
            value={formData.email}
            placeholder="email"
            onChange={(e: any) => updateFormState(e)}
          />
        </FormRow>
        <FormRow>
          <FormText htmlFor="project">Project :</FormText>
          <TextArea
            id="project"
            name="project"
            placeholder="project"
            //@ts-ignore
            value={formData.project}
            onChange={(e: any) => updateFormState(e)}
          />
        </FormRow>

        <input type="hidden" name="form-name" value="connect-form" />
        <MainButton
          onClick={() => {
            setEnter(mobile ? !enter : true)
          }}
          borderColor={colors.dullTeal}
          backgroundColor={colors.inputTeal}
          bGOpacity={"20"}
        >
          Send <br /> message
        </MainButton>
      </Wrapper>
      <SuccessMessage success={success}>
        Thanks for reaching out. <br /> I'll be in touch soon.
      </SuccessMessage>
    </FormModal>
  )
}

const FormModal = styled.form<{
  leftVal: string
  leftValT: string
  topVal: string
  topValT: string
  enter: boolean
}>`
  position: absolute;
  width: 32vw;
  height: 26vw;
  left: ${props => props.leftVal};
  top: ${props => props.topVal};
  padding: 2vw;
  background: ${colors.formSkinPurprle};
  border-radius: 0.5vw;
  opacity: 0;
  transform: scale(0);
  box-sizing: border-box;

  ${media.tablet} {
    width: 40vw;
    height: 35vw;
    left: ${props => props.leftValT};
    top: ${props => props.topValT};

    ${text.tablet.bodyS};
  }
  ${media.mobile} {
    width: 90vw;
    height: auto;
    padding: 5vw;
    left: 5vw;
    top: ${props => props.topVal};
  }
`

const FormRow = styled.div`
  display: flex;
  ${text.desktop.bodyS}
  width: 100%;

  justify-content: space-between;
  align-items: center;
  margin-bottom: 1vw;

  ${media.tablet} {
    ${text.tablet.bodyXS}
    :nth-of-type(3) {
      margin-bottom: 30px;
    }
  }
  ${media.mobile} {
    ${text.mobile.bodyXS};
    margin-bottom: 3vw;
  }
`

const FormText = styled.label`
  margin-right: 2vw;
  margin-left: 0.6vw;
  color: ${colors.coolWhite};
  ${media.tablet} {
    margin-right: 0;
  }
  ${media.mobile} {
    ${text.mobile.bodyM};
  }
`

const TextInput = styled.input`
  height: 2.5vw;
  width: 20vw;
  background: ${colors.inputTeal};

  border: none;

  border-radius: 0.3vw;
  padding-left: 1vw;

  ${media.tablet} {
    ${text.tablet.bodyS}
    width: 80%;
    height: 3vw;
  }
  ${media.mobile} {
    ${text.mobile.bodyS}
    height: 7vw;
    width: 70%;
  }
`

const TextArea = styled.textarea`
  height: 6vw;
  width: 20vw;
  background: linear-gradient(
    90.38deg,
    #89c1b4 2.99%,
    rgba(124, 146, 140, 0.81) 99.88%
  );
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.3vw;
  padding-left: 1vw;
  ${text.desktop.bodyS}
  color: black;
  ${media.tablet} {
    height: 9vw;
    width: 80%;
    ${text.tablet.bodyS};
  }
  ${media.mobile} {
    ${text.mobile.bodyS}
    height: 25vw;
    width: 70%;
  }
`

const SuccessMessage = styled.div<{ success: boolean }>`
  ${text.desktop.bodyS}

  position: absolute;
  transform: scale(${props => (props.success ? 1 : 0)});
  opacity: (${props => (props.success ? 1 : 0)});
  transition: 0.5s;
  ${media.mobile} {
    ${text.mobile.bodyM}
  }
`

const Wrapper = styled.div<{ success: boolean }>`
  ${text.desktop.bodyS}
  position: absolute;
  transform: scale(${props => (props.success ? 0 : 1)});
  opacity: (${props => (props.success ? 0 : 1)});
  transition: 0.5s;

  ${media.tablet} {
    ${text.tablet.bodyS};
    width: 85%;
  }
  ${media.mobile} {
    position: relative;
    width: 100%;
    height: 100%;
  }
`

export default ContactForm
