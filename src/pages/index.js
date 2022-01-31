import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/Layout";
import styled from "styled-components";

const Home = () => {
  return (
    <Layout>
      <Container>
        <Intro>
          <Title>
            La solución tecno-ecológica para el manejo de envases plásticos de
            fertilizantes, pesticidas y herbicidas.
          </Title>

          <Image
            src="/images/bxs-donate-heart.svg" // Route of the image file
            height={144} // Desired size with correct aspect ratio
            width={144} // Desired size with correct aspect ratio
            alt="imagen principal"
          />

          <Title>
            Las mejores prácticas para el manejo de envases plásticos de
            agroquímicos para cuidar tu salud y el ambiente.
          </Title>
        </Intro>

        <Hr />

        <Objectives>
          <ItemOneObjectives>
            <TitleObjectives>Nuestros objetivos</TitleObjectives>
            <Image
              src="/images/allow.svg" // Route of the image file
              height={105} // Desired size with correct aspect ratio
              width={115} // Desired size with correct aspect ratio
              alt="oud world"
            />
          </ItemOneObjectives>
          <ItemObjectives>
            <Image
              src="/images/bx-wifi.svg" // Route of the image file
              height={105} // Desired size with correct aspect ratio
              width={115} // Desired size with correct aspect ratio
              alt="oud world"
            />
            <Image
              src="/images/bx-male-female.svg" // Route of the image file
              height={105} // Desired size with correct aspect ratio
              width={115} // Desired size with correct aspect ratio
              alt="oud world"
            />
            <Image
              src="/images/bx-recycle.svg" // Route of the image file
              height={105} // Desired size with correct aspect ratio
              width={115} // Desired size with correct aspect ratio
              alt="oud world"
            />
          </ItemObjectives>
          <ItemObjectives>
            <TextOne>
              Conectar a los dueños de fincas con los centros de acopio.
            </TextOne>
            <TextTwo>
              Crear una comunidad recicladora que comparta experiencias y
              consejos amigables con el medio ambiente.
            </TextTwo>
            <TextThree>
              Concientizar sobre el tratamiento tradicional de los plásticos de
              tipo HDPE y dar un giro de 180° a esta situación.
            </TextThree>
          </ItemObjectives>
        </Objectives>

        <Hr />

        <Triple>
          <TitleTriple>Técnica del triple lavado</TitleTriple>

          <ItemOneTriple>
            <Image
              src="/images/stepthree.png" // Route of the image file
              height={144} // Desired size with correct aspect ratio
              width={144} // Desired size with correct aspect ratio
              alt="paso uno"
            />
            <Steps>Escurrir bien el envase en la fumigadora</Steps>
          </ItemOneTriple>

          <ItemTwoTriple>
            <Subitem>
              <Image
                src="/images/stepone.png" // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="paso dos"
              />
              <Steps>Llenar el envase con 1/4 de agua y taparlo</Steps>
            </Subitem>

            <Subitem>
              <Image
                src="/images/steptwo.png" // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="paso tres"
              />
              <Steps>Agitar varias veces en todas direcciones</Steps>
            </Subitem>

            <Subitem>
              <Image
                src="/images/stepthree.png" // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="imagen principal"
              />
              <Steps>Verter el agua del envase en la fumigadora</Steps>
            </Subitem>
            <Repeat>Repetir el procedimiento 3 veces</Repeat>
          </ItemTwoTriple>

          <ItemThreeTriple>
            <Image
              src="/images/stepfour.png" // Route of the image file
              height={144} // Desired size with correct aspect ratio
              width={144} // Desired size with correct aspect ratio
              alt="imagen principal"
            />
            <Steps>Perforar el envase para evitar la reutiliación</Steps>
          </ItemThreeTriple>
        </Triple>

        <Hr />

        <Practice>
          <TitlePractice>Manejo de los envases</TitlePractice>

          <ItemPractice>
            <Image
              src="/images/wrong.png" // Route of the image file
              height={144} // Desired size with correct aspect ratio
              width={144} // Desired size with correct aspect ratio
              alt="Apilamiento incorrecto"
            />
            <Steps>
              Nunca apile los envases vacios en las parcelas para evitar la
              contaminacion del suelo y los cultivos.
            </Steps>
          </ItemPractice>

          <ItemPractice>
            <Image
              src="/images/correct.png" // Route of the image file
              height={144} // Desired size with correct aspect ratio
              width={144} // Desired size with correct aspect ratio
              alt="imagen principal"
            />
            <Steps>
              Destine un lugar específico para el apilamiento de los envases
              cubierto de la intemperie y guardados en fundas o costales.
            </Steps>
          </ItemPractice>

          <ItemPractice>
            <Image
              src="/images/canecas.png" // Route of the image file
              height={144} // Desired size with correct aspect ratio
              width={144} // Desired size with correct aspect ratio
              alt="imagen principal"
            />
            <Steps>
              Apile las canecas en forma ordenada en un lugar igualmente
              cubierto de la intemperie.
            </Steps>
          </ItemPractice>
        </Practice>

        <Hr />

        <Register>
          <Link href="/registro/finca">
            <ItemRegister>
              <TitleRegister>Tengo una finca</TitleRegister>
              <Image
                src="/images/track.svg" // Route of the image file
                height={105} // Desired size with correct aspect ratio
                width={115} // Desired size with correct aspect ratio
                alt="oud world"
              />
              <SubitemRegister>
                <SubtitleRegister>
                  Quiero ser parte de EcoFinca
                </SubtitleRegister>
                <Image
                  src="/images/users-3.svg" // Route of the image file
                  height={25} // Desired size with correct aspect ratio
                  width={35} // Desired size with correct aspect ratio
                  alt="user-acopio"
                />
              </SubitemRegister>
            </ItemRegister>
          </Link>

          <Link href="/registro/acopio">
            <ItemRegister>
              <TitleRegister>Tengo un centro de acopio</TitleRegister>
              <Image
                src="/images/home.svg" // Route of the image file
                height={105} // Desired size with correct aspect ratio
                width={115} // Desired size with correct aspect ratio
                alt="oud world"
              />
              <SubitemRegister>
                <SubtitleRegister>
                  Quiero ser parte de EcoFinca
                </SubtitleRegister>
                <Image
                  src="/images/users-3.svg" // Route of the image file
                  height={25} // Desired size with correct aspect ratio
                  width={35} // Desired size with correct aspect ratio
                  alt="user-acopio"
                />
              </SubitemRegister>
            </ItemRegister>
          </Link>
        </Register>

        <Hr />

        <Link href="/sesion/login">
          <Title>¿Ya tienes una cuenta? Inicia Sesión</Title>
        </Link>
      </Container>
    </Layout>
  );
};
export default Home;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto auto auto;
  width: 100%;
  margin: auto;
  padding: 20px;
  color: #1b4332;
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;
  margin: auto;
`;

const Objectives = styled.div`
  display: grid;
  grid-template-columns: 590px auto auto;
  width: 100%;
  margin: auto;
`;

const ItemOneObjectives = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  margin: auto;
`;

const ItemObjectives = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  width: 100%;
  margin: auto;
`;

const Triple = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto;
  width: 100%;
  margin: auto;
  padding: 10px;
  justify-content: space-between;
`;

const Register = styled.div`
  display: grid;
  grid-template-columns: 500px 500px;
  width: 100%;
  margin: auto;
  padding: 10px;
  justify-content: space-evenly;
`;

const ItemRegister = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  width: 100%;
  padding: 20px;
  background: #d8f3dc;
  border-radius: 50px;
  cursor: pointer;
`;

const SubitemRegister = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  margin-top: 5px;
  padding: 5px;
  border-radius: 50px;
  background: #52b788;
`;

const TitleRegister = styled.h2`
  text-align: center;
  color: #1b4332;
  padding: 10px;
  margin: 10px;
`;

const SubtitleRegister = styled.h3`
  text-align: center;
  color: #d8f3dc;
  padding: 10px;
  margin: 10px;
`;

const Practice = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto auto;
  width: 100%;
  margin: auto;
  padding: 10px;
  color: #1b4332;
  justify-content: space-between;
`;

const Title = styled.h2`
  text-align: center;
  color: #1b4332;
  padding: 10px;
  margin: 10px;
  background: #d8f3dc;
  border-radius: 50px;
  cursor: pointer;
`;

const TitleObjectives = styled.h1`
  text-align: center;
  color: #1b4332;
  padding: 10px;
`;

const TitleTriple = styled.h1`
  grid-column: 1 / span 3;
  text-align: center;
  color: #d8f3dc;
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  background: #52b788;
`;

const TitlePractice = styled.h1`
  grid-column: 1 / span 4;
  text-align: center;
  color: #d8f3dc;
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  background: #52b788;
`;

const Steps = styled.h4`
  text-align: center;
  color: #1b4332;
  padding: 10px;
  margin: 10px;
`;

const ItemOneTriple = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  padding: 5px;
`;

const ItemTwoTriple = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  justify-content: center;
  width: 100%;
  padding: 5px;
  background: #d8f3dc;
  border-radius: 50px;
`;

const ItemThreeTriple = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  padding: 5px;
`;

const ItemPractice = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  padding: 5px;
`;

const Subitem = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  width: 100%;
  padding: 5px;
`;

const Repeat = styled.h4`
  grid-column: 1 / span 3;
  text-align: center;
  color: #d8f3dc;
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  background: #52b788;
`;

const TextOne = styled.h3`
  text-align: center;
  color: #8b2635;
  padding: 10px;
  margin: 10px;
`;

const TextTwo = styled.h3`
  text-align: center;
  color: #166088;
  padding: 10px;
  margin: 10px;
`;

const TextThree = styled.h3`
  text-align: center;
  color: #52b788;
  padding: 10px;
  margin: 10px;
`;

const Hr = styled.hr`
  width: 100%;
  margin: auto;
  color: #1b4332;
`;
