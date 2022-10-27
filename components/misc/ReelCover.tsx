export function ReelCover() {
  return (
    <>
      <div className="lg:hidden overflow-hidden transform-gpu md:scale-150 origin-center flex items-center justify-center h-full">
        <MobileCover />
      </div>
      <div className="hidden overflow-hidden lg:flex transform-gpu h-full items-center justify-center">
        <DesktopCover />
      </div>
    </>
  )
}

function DesktopCover() {
  return (
    <svg
      width="638"
      height="64"
      viewBox="0 0 638 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60.9518 18.2857V15.2375H57.9054V12.1911H54.8571V9.14286H51.8089V6.09463H48.7625V3.04823H45.7143V0H36.5714V3.04823H33.5232V6.09463H30.4768V3.04823H27.4286V0H18.2857V3.04823H15.2375V6.09463H12.1911V9.14286H9.14286V12.1911H6.09463V15.2375H3.04823V21.3339H0V39.6197H3.04823V45.7143H6.09463V51.8089H9.14286V54.8571H12.1911V57.9054H15.2375V60.9518H21.3339V64H42.6661V60.9518H48.7625V57.9054H51.8089V54.8571H54.8571V51.8089H57.9054V45.7143H60.9518V39.6197H64V21.3339H60.9518V18.2857ZM57.9054 24.3803V27.4286H45.7143V30.4768H39.6197V33.5232H36.5714V36.5714H27.4286V33.5232H24.3803V30.4768H18.2857V27.4286H6.09463V24.3803H9.14286V21.3339H12.1911V15.2375H15.2375V12.1911H18.2857V9.14286H27.4286V12.1911H36.5714V9.14286H45.7143V12.1911H48.7625V15.2375H51.8089V21.3339H54.8571V24.3803H57.9054ZM39.6197 57.9054H21.3339V54.8571H18.2857V51.8089H15.2375V48.7625H12.1911V42.6661H9.14286V36.5714H6.09463V33.5232H18.2857V36.5714H21.3339V39.6197H27.4286V42.6661H36.5714V39.6197H42.6661V36.5714H45.7143V33.5232H57.9054V36.5714H54.8571V42.6661H51.8089V48.7625H48.7625V51.8089H45.7143V54.8571H42.6661V57.9054H39.6197Z"
        fill="#FF003A"
      />
      <path
        d="M130.765 30.4759H133.813V27.4276V24.3794V21.333H130.765H127.718H124.67V24.3794V27.4276V30.4759H127.718H130.765Z"
        fill="#00EAFF"
      />
      <path
        d="M115.527 30.4759H118.575V27.4276V24.3794V21.333H115.527H112.479H109.432V24.3794V27.4276V30.4759H112.479H115.527Z"
        fill="#00EAFF"
      />
      <path
        d="M100.289 30.4759H103.335V27.4276V24.3794V21.333H100.289H97.2408H94.1926V24.3794V27.4276V30.4759H97.2408H100.289Z"
        fill="#00EAFF"
      />
      <path
        d="M85.0482 48.7625V51.8089H94.1911V64H106.38V60.9518H109.429V57.9054H112.477V54.8571H115.523V51.8089H142.952V45.7143H146V9.14286H142.952V3.04823H136.857V0H91.1429V3.04823H85.0482V9.14286H82V45.7143H85.0482V48.7625ZM91.1429 9.14286V6.09463H136.857V9.14286H139.905V42.6661H136.857V45.7143H112.477V48.7625H109.429V51.8089H106.38V54.8571H103.334V57.9054H100.286V45.7143H91.1429V42.6661H88.0946V9.14286H91.1429Z"
        fill="#00EAFF"
      />
      <path
        d="M167.048 24.3803H176.191V21.3339H182.286V18.2857H185.334V9.14286H188.38V3.04823H191.429V0H200.571V3.04823H203.62V9.14286H206.666V18.2857H209.714V21.3339H215.809V24.3803H224.952V27.4286H228V36.5714H224.952V39.6197H215.809V42.6661H209.714V45.7143H206.666V54.8571H203.62V60.9518H200.571V64H191.429V60.9518H188.38V54.8571H185.334V45.7143H182.286V42.6661H176.191V39.6197H167.048V36.5714H164V27.4286H167.048V24.3803ZM176.191 36.5714H185.334V39.6197H188.38V45.7143H191.429V54.8571H194.477V57.9054H197.523V54.8571H200.571V45.7143H203.62V39.6197H206.666V36.5714H218.857V33.5232H221.905V30.4768H218.857V27.4286H206.666V24.3803H203.62V18.2857H200.571V9.14286H197.523V6.09463H194.477V9.14286H191.429V18.2857H188.38V24.3803H185.334V27.4286H173.143V30.4768H170.095V33.5232H173.143V36.5714H176.191Z"
        fill="#EDFA00"
      />
      <path
        d="M170.091 57.9065V54.8601V51.8101H173.139H176.188V54.8601V57.9065H173.139H170.091Z"
        fill="#EDFA00"
      />
      <path
        d="M176.188 6.08984V9.1399V12.1863H173.139H170.091V9.1399V6.08984H173.139H176.188Z"
        fill="#EDFA00"
      />
      <path
        d="M215.811 57.9065V54.8601V51.8101H218.859H221.907V54.8601V57.9065H218.859H215.811Z"
        fill="#EDFA00"
      />
      <path
        d="M221.907 6.08984V9.1399V12.1863H218.859H215.811V9.1399V6.08984H218.859H221.907Z"
        fill="#EDFA00"
      />
      <path
        d="M306.952 15.2375V12.1911H303.905V9.14286H300.857V6.09463H297.809V3.04823H291.714V0H264.286V3.04823H258.191V6.09463H255.143V9.14286H252.095V12.1911H249.048V18.2857H246V36.5714H249.048V42.666H252.095V48.7625H255.143V54.8571H258.191V57.9054H261.237V60.9518H267.334V64H288.666V60.9518H294.763V57.9054H297.809V54.8571H300.857V51.8089H303.905V42.666H306.952V33.5232H310V18.2857H306.952V15.2375ZM303.905 21.3339V33.5232H300.857V42.666H297.809V48.7625H294.763V51.8089H291.714V54.8571H285.62V57.9054H270.38V54.8571H264.286V51.8089H261.237V48.7625H258.191V42.666H255.143V33.5232H252.095V18.2857H255.143V15.2375H258.191V12.1911H261.237V9.14286H264.286V6.09463H291.714V9.14286H294.763V12.1911H297.809V15.2375H300.857V18.2857H303.905V21.3339Z"
        fill="#FF66FF"
      />
      <path
        d="M294.763 18.2856H291.714H288.666H285.62V21.3339H282.572V24.3803V27.4285V30.4767V33.5231V36.5714H285.62H288.666V33.5231H291.714H294.763V30.4767H297.809V27.4285V24.3803V21.3339H294.763V18.2856Z"
        fill="#FF66FF"
      />
      <path
        d="M282.571 42.666H279.523V45.7143H282.571V42.666Z"
        fill="#FF66FF"
      />
      <path
        d="M276.477 42.666H273.428V45.7143H276.477V42.666Z"
        fill="#FF66FF"
      />
      <path
        d="M273.429 33.5231V30.4767V27.4285V24.3803V21.3339H270.38V18.2856H267.334H264.286H261.238V21.3339H258.191V24.3803V27.4285V30.4767H261.238V33.5231H264.286H267.334V36.5714H270.38H273.429V33.5231Z"
        fill="#FF66FF"
      />
      <path
        d="M388.952 15.2375H385.905V12.1911H379.809V9.14286H367.62V12.1911H364.571V15.2375H361.523V9.14286H364.571V6.09463H367.62V3.04823H376.763V6.09463H379.809V9.14286H388.952V3.04823H385.905V0H364.571V3.04823H358.477V15.2375H355.429V12.1911H352.38V9.14286H340.191V12.1911H334.095V15.2375H331.048V18.2857H328V48.7625H331.048V51.8089H334.095V54.8571H337.143V57.9054H340.191V60.9518H343.237V64H376.763V60.9518H379.809V57.9054H382.857V54.8571H385.905V51.8089H388.952V48.7625H392V18.2857H388.952V15.2375ZM355.429 18.2857V21.3339H358.477V27.4286H355.429V24.3803H340.191V27.4286H343.237V30.4768H352.38V33.5232H367.62V30.4768H376.763V27.4286H379.809V24.3803H364.571V27.4286H361.523V21.3339H364.571V18.2857H367.62V15.2375H376.763V18.2857H382.857V21.3339H385.905V45.7143H382.857V48.7625H379.809V51.8089H376.763V54.8571H373.714V57.9054H346.286V54.8571H343.237V51.8089H340.191V48.7625H337.143V45.7143H334.095V21.3339H337.143V18.2857H343.237V15.2375H352.38V18.2857H355.429Z"
        fill="#FF003A"
      />
      <path
        d="M552.952 12.1911V9.14286H549.905V6.09463H546.857V3.04823H543.809V0H504.191V3.04823H501.143V6.09463H498.095V9.14286H495.048V15.2375H492V51.8089H495.048V54.8571H498.095V57.9054H501.143V60.9518H504.191V64H543.809V60.9518H546.857V57.9054H549.905V54.8571H552.952V51.8089H556V15.2375H552.952V12.1911ZM549.905 18.2857V48.7625H546.857V51.8089H543.809V54.8571H540.763V57.9054H507.237V54.8571H504.191V51.8089H501.143V48.7625H498.095V15.2375H501.143V12.1911H504.191V9.14286H507.237V6.09463H540.763V9.14286H543.809V12.1911H546.857V15.2375H549.905V18.2857Z"
        fill="#FF6216"
      />
      <path
        d="M540.761 30.4771V33.5235V36.5717H537.714V39.6199V42.6663H534.666V45.7145H531.618H528.571H525.523H522.475H519.429H516.38H513.332V42.6663H510.286V39.6199V36.5717H507.237V33.5235V30.4771H504.189H501.143V33.5235V36.5717V39.6199H504.189V42.6663V45.7145H507.237V48.7628H510.286V51.8092H513.332H516.38H519.429H522.475H525.523H528.571H531.618H534.666H537.714V48.7628H540.761V45.7145H543.809V42.6663V39.6199H546.857V36.5717V33.5235V30.4771H543.809H540.761Z"
        fill="#FF6216"
      />
      <path
        d="M537.714 24.3803H540.761V21.3339V18.2856H537.714H534.666H531.618V21.3339V24.3803H534.666H537.714Z"
        fill="#FF6216"
      />
      <path
        d="M513.332 24.3803H516.38V21.3339V18.2856H513.332H510.286H507.238V21.3339V24.3803H510.286H513.332Z"
        fill="#FF6216"
      />
      <path
        d="M638 21.3338V18.2855V15.2373H634.952H631.905V18.2855V21.3338H634.952H638Z"
        fill="#FF66FF"
      />
      <path
        d="M607.523 6.09646H610.571V3.0464V0H607.523H604.477H601.429V3.0464V6.09646H604.477H607.523Z"
        fill="#FF66FF"
      />
      <path
        d="M607.523 9.14453H604.477V12.1909H607.523V9.14453Z"
        fill="#FF66FF"
      />
      <path
        d="M580.095 63.9998H638V24.3802H634.952V27.4284H631.905V30.4766H628.857V33.523H625.809V36.5713H619.714V30.4766H616.666V24.3802H613.62V18.2855H610.571V12.1909H601.429V18.2855H598.38V24.3802H595.334V30.4766H592.286V36.5713H586.191V33.523H583.143V30.4766H580.095V27.4284H577.048V24.3802H574V63.9998H580.095ZM607.523 18.2855V27.4284H610.571V33.523H613.62V39.6195H616.666V42.6659H619.714V45.7141H625.809V42.6659H628.857V39.6195H631.905V57.9052H580.095V39.6195H583.143V42.6659H586.191V45.7141H592.286V42.6659H595.334V39.6195H598.38V33.523H601.429V27.4284H604.477V18.2855H607.523Z"
        fill="#FF66FF"
      />
      <path
        d="M580.095 21.3338V18.2855V15.2373H577.048H574V18.2855V21.3338H577.048H580.095Z"
        fill="#FF66FF"
      />
      <path
        d="M470.952 9.14286H467.905V6.09462H464.857V3.04824H461.809V0H422.191V3.04824H419.143V6.09462H416.095V9.14286H413.048V12.1911H410V36.5714H413.048V39.6197H416.095V42.666H419.143V45.7143H422.191V48.7625H425.237V51.8089H428.286V54.8571H431.334V57.9054H434.38V60.9518H437.429V64H446.571V60.9518H449.62V57.9054H452.666V54.8571H455.714V51.8089H458.763V48.7625H461.809V45.7143H464.857V42.666H467.905V39.6197H470.952V36.5714H474V12.1911H470.952V9.14286ZM467.905 15.2375V21.334H455.714V18.2857H458.763V15.2375H461.809V12.1911H464.857V15.2375H467.905ZM467.905 30.4768V33.5232H464.857V36.5714H461.809V39.6197H458.763V42.666H455.714V45.7143H452.666V48.7625H449.62V51.8089H443.523V48.7625H446.571V42.666H449.62V36.5714H452.666V30.4768H455.714V27.4286H467.905V30.4768ZM431.334 48.7625V45.7143H428.286V42.666H425.237V39.6197H422.191V36.5714H419.143V33.5232H416.095V27.4286H428.286V30.4768H431.334V36.5714H434.38V42.666H437.429V48.7625H440.477V51.8089H434.38V48.7625H431.334ZM416.095 18.2857V15.2375H419.143V12.1911H422.191V15.2375H425.237V18.2857H428.286V21.334H416.095V18.2857ZM425.237 6.09462H440.477V9.14286H437.429V12.1911H431.334V15.2375H428.286V12.1911H425.237V6.09462ZM458.763 9.14286V12.1911H455.714V15.2375H452.666V12.1911H446.571V9.14286H443.523V6.09462H458.763V9.14286ZM449.62 30.4768V33.5232H446.571V39.6197H443.523V42.666H440.477V39.6197H437.429V33.5232H434.38V27.4286H449.62V30.4768ZM452.666 21.334H431.334V18.2857H434.38V15.2375H440.477V12.1911H443.523V15.2375H449.62V18.2857H452.666V21.334Z"
        fill="#00EAFF"
      />
    </svg>
  )
}

function MobileCover() {
  return (
    <svg
      width="182"
      height="30"
      viewBox="0 0 182 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5711 8.57143V7.14257H27.1431V5.71457H25.7143V4.28571H24.2854V2.85686H22.8574V1.42886H21.4286V0H17.1429V1.42886H15.714V2.85686H14.286V1.42886H12.8571V0H8.57143V1.42886H7.14257V2.85686H5.71457V4.28571H4.28571V5.71457H2.85686V7.14257H1.42886V10.0003H0V18.5717H1.42886V21.4286H2.85686V24.2854H4.28571V25.7143H5.71457V27.1431H7.14257V28.5711H10.0003V30H19.9997V28.5711H22.8574V27.1431H24.2854V25.7143H25.7143V24.2854H27.1431V21.4286H28.5711V18.5717H30V10.0003H28.5711V8.57143ZM27.1431 11.4283V12.8571H21.4286V14.286H18.5717V15.714H17.1429V17.1429H12.8571V15.714H11.4283V14.286H8.57143V12.8571H2.85686V11.4283H4.28571V10.0003H5.71457V7.14257H7.14257V5.71457H8.57143V4.28571H12.8571V5.71457H17.1429V4.28571H21.4286V5.71457H22.8574V7.14257H24.2854V10.0003H25.7143V11.4283H27.1431ZM18.5717 27.1431H10.0003V25.7143H8.57143V24.2854H7.14257V22.8574H5.71457V19.9997H4.28571V17.1429H2.85686V15.714H8.57143V17.1429H10.0003V18.5717H12.8571V19.9997H17.1429V18.5717H19.9997V17.1429H21.4286V15.714H27.1431V17.1429H25.7143V19.9997H24.2854V22.8574H22.8574V24.2854H21.4286V25.7143H19.9997V27.1431H18.5717Z"
        fill="#FF003A"
      />
      <path
        d="M60.8586 14.2857H62.2874V12.8569V11.428V10H60.8586H59.4306H58.0017V11.428V12.8569V14.2857H59.4306H60.8586Z"
        fill="#00EAFF"
      />
      <path
        d="M53.716 14.2857H55.1448V12.8569V11.428V10H53.716H52.2871H50.8591V11.428V12.8569V14.2857H52.2871H53.716Z"
        fill="#00EAFF"
      />
      <path
        d="M46.5733 14.2857H48.0013V12.8569V11.428V10H46.5733H45.1444H43.7156V11.428V12.8569V14.2857H45.1444H46.5733Z"
        fill="#00EAFF"
      />
      <path
        d="M39.4289 22.8574V24.2854H43.7146V30H49.4283V28.5711H50.8571V27.1431H52.286V25.7143H53.714V24.2854H66.5711V21.4286H68V4.28571H66.5711V1.42886H63.7143V0H42.2857V1.42886H39.4289V4.28571H38V21.4286H39.4289V22.8574ZM42.2857 4.28571V2.85686H63.7143V4.28571H65.1431V19.9997H63.7143V21.4286H52.286V22.8574H50.8571V24.2854H49.4283V25.7143H48.0003V27.1431H46.5714V21.4286H42.2857V19.9997H40.8569V4.28571H42.2857Z"
        fill="#00EAFF"
      />
      <path
        d="M77.4289 11.4283H81.7146V10.0003H84.5714V8.57143H86.0003V4.28571H87.4283V1.42886H88.8571V0H93.1429V1.42886H94.5717V4.28571H95.9997V8.57143H97.4286V10.0003H100.285V11.4283H104.571V12.8571H106V17.1429H104.571V18.5717H100.285V19.9997H97.4286V21.4286H95.9997V25.7143H94.5717V28.5711H93.1429V30H88.8571V28.5711H87.4283V25.7143H86.0003V21.4286H84.5714V19.9997H81.7146V18.5717H77.4289V17.1429H76V12.8571H77.4289V11.4283ZM81.7146 17.1429H86.0003V18.5717H87.4283V21.4286H88.8571V25.7143H90.286V27.1431H91.714V25.7143H93.1429V21.4286H94.5717V18.5717H95.9997V17.1429H101.714V15.714H103.143V14.286H101.714V12.8571H95.9997V11.4283H94.5717V8.57143H93.1429V4.28571H91.714V2.85686H90.286V4.28571H88.8571V8.57143H87.4283V11.4283H86.0003V12.8571H80.2857V14.286H78.8569V15.714H80.2857V17.1429H81.7146Z"
        fill="#EDFA00"
      />
      <path
        d="M78.8552 27.1438V25.7158V24.2861H80.284H81.7129V25.7158V27.1438H80.284H78.8552Z"
        fill="#EDFA00"
      />
      <path
        d="M81.7129 2.85449V4.28421V5.71221H80.284H78.8552V4.28421V2.85449H80.284H81.7129Z"
        fill="#EDFA00"
      />
      <path
        d="M100.286 27.1438V25.7158V24.2861H101.715H103.144V25.7158V27.1438H101.715H100.286Z"
        fill="#EDFA00"
      />
      <path
        d="M103.144 2.85449V4.28421V5.71221H101.715H100.286V4.28421V2.85449H101.715H103.144Z"
        fill="#EDFA00"
      />
      <path
        d="M142.571 5.14347V3.85741H141.143V2.57135H139.714V1.28606H138.285V0H119.715V1.28606H118.286V2.57135H116.857V3.85741H115.429V6.42876H114V21.8584H115.429V23.1445H116.857V24.4305H118.286V25.7158H119.715V27.0019H138.285V25.7158H139.714V24.4305H141.143V23.1445H142.571V21.8584H144V6.42876H142.571V5.14347ZM141.143 7.71482V20.5731H139.714V21.8584H138.285V23.1445H136.857V24.4305H121.143V23.1445H119.715V21.8584H118.286V20.5731H116.857V6.42876H118.286V5.14347H119.715V3.85741H121.143V2.57135H136.857V3.85741H138.285V5.14347H139.714V6.42876H141.143V7.71482Z"
        fill="#FF6216"
      />
      <path
        d="M136.857 12.8584V14.1437V15.4297H135.429V16.7158V18.0011H134V19.2872H132.571H131.143H129.714H128.285H126.857H125.428H123.999V18.0011H122.571V16.7158V15.4297H121.143V14.1437V12.8584H119.714H118.286V14.1437V15.4297V16.7158H119.714V18.0011V19.2872H121.143V20.5732H122.571V21.8585H123.999H125.428H126.857H128.285H129.714H131.143H132.571H134H135.429V20.5732H136.857V19.2872H138.285V18.0011V16.7158H139.714V15.4297V14.1437V12.8584H138.285H136.857Z"
        fill="#FF6216"
      />
      <path
        d="M135.429 10.2862H136.857V9.0009V7.71484H135.429H134H132.571V9.0009V10.2862H134H135.429Z"
        fill="#FF6216"
      />
      <path
        d="M124 10.2862H125.429V9.0009V7.71484H124H122.572H121.143V9.0009V10.2862H122.572H124Z"
        fill="#FF6216"
      />
      <path
        d="M182 9.00132V7.71526V6.4292H180.571H179.143V7.71526V9.00132H180.571H182Z"
        fill="#FF66FF"
      />
      <path
        d="M167.714 2.57212H169.143V1.28529V0H167.714H166.286H164.857V1.28529V2.57212H166.286H167.714Z"
        fill="#FF66FF"
      />
      <path
        d="M167.714 3.8584H166.286V5.14369H167.714V3.8584Z"
        fill="#FF66FF"
      />
      <path
        d="M154.857 27.002H182V10.2863H180.571V11.5723H179.143V12.8584H177.714V14.1437H176.285V15.4297H173.429V12.8584H172V10.2863H170.572V7.71491H169.143V5.14355H164.857V7.71491H163.428V10.2863H162V12.8584H160.571V15.4297H157.715V14.1437H156.286V12.8584H154.857V11.5723H153.429V10.2863H152V27.002H154.857ZM167.714 7.71491V11.5723H169.143V14.1437H170.572V16.7158H172V18.0011H173.429V19.2871H176.285V18.0011H177.714V16.7158H179.143V24.4306H154.857V16.7158H156.286V18.0011H157.715V19.2871H160.571V18.0011H162V16.7158H163.428V14.1437H164.857V11.5723H166.286V7.71491H167.714Z"
        fill="#FF66FF"
      />
      <path
        d="M154.857 9.00132V7.71526V6.4292H153.429H152V7.71526V9.00132H153.429H154.857Z"
        fill="#FF66FF"
      />
    </svg>
  )
}
