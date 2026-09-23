(function () {
  window.PORTFOLIO_DATA = {
    common: {
      profile: {
        name: "안성식",
      },
    },
    windowsCase: {
      title: "Windows 장비 연동 개발 포트폴리오",
      subtitle: "서로 다른 장비 입력을 화면·로그·외부 시스템·녹화 파일로 연결한 두 가지 실무 사례",
      summary: "Serial·UDP·FEnet 기반 장비 데이터 연동과 9채널 RTSP 영상 표시·녹화를 구현했습니다. 입력 수신부터 파싱·변환, 화면·파일·외부 시스템 전달, 종료 시 자원 해제까지 전체 수명주기를 중심으로 정리했습니다.",
      projects: {
        dataHub: {
          title: "TunnelROVDataHub",
          period: "2024.04 ~ 2024.12",
          responsibility: "담당 범위 · Windows 클라이언트 프로그램 개발",
          stack: ["C#", "WinForms", "Serial", "UDP", "FEnet", "Packet Parsing"],
          intro: "GNSS·소나·고도계·PLC 데이터를 수집·처리해 항법·운용 시스템으로 전달하는 Windows 데이터 통합 프로그램",
          imageMain: "assets/images/windows/datahub-main.png",
          imageConfig: "assets/images/windows/datahub-config.png",
          imageLogs: "assets/images/windows/datahub-logs.png",
          io: [
            ["입력", "GNSS·고도계의 Serial, HNAV·Profiling Sonar의 UDP, CableReel PLC의 FEnet 데이터"],
            ["처리", "장비별 비동기 수신, 이진·텍스트 패킷 파싱, 내부 형식 변환, UI 스레드 전환"],
            ["출력", "HNAV·EIVA·QGroundControl로 전달하는 UDP 데이터와 장비·날짜별 송수신 로그"],
          ],
          implementation: [
            "Serial·UDP·FEnet 입력을 장비별 비동기 수신 루프로 분리하고 이진·텍스트 패킷 파싱",
            "수신 값을 내부 형식으로 변환한 뒤 항법·운용 시스템이 요구하는 UDP 데이터로 전달",
            "백그라운드 결과를 BeginInvoke로 UI 스레드에 전달해 장비별 상태와 데이터 갱신",
            "UdpClient·SerialPort, 통신 설정, 표시 필터와 날짜별 로그를 장비 단위로 관리",
          ],
          lifecycle: [
            "장비별 수신 오류와 연결 상태를 각각의 화면과 로그에 분리 기록",
            "종료 요청 시 CancellationToken으로 수신 작업을 중단한 뒤 UDP·Serial 연결과 타이머를 순서대로 해제",
          ],
          results: [
            "GNSS·항법·소나·고도계·PLC의 송수신 상태와 데이터를 한 화면에서 장비별로 확인",
            "통신 설정과 송수신 로그를 장비·날짜별로 분리해 연결 상태와 기록 추적",
          ],
        },
        camera: {
          title: "ROV Camera System",
          period: "2024.05 ~ 2024.12",
          responsibility: "담당 범위 · Windows 클라이언트 프로그램 개발",
          stack: ["C++", "MFC", "CUDA", "RTSP", "FFmpeg", "NVENC"],
          intro: "측면 8대와 후방 1대, 총 9개 RTSP 영상을 실시간 표시하고 카메라별 제어와 H.264 녹화를 수행하는 Windows 프로그램",
          imageMain: "assets/images/windows/camera-system.png",
          io: [
            ["입력", "9개 카메라의 RTSP 스트림과 노출·초점·조명 제어값"],
            ["처리", "RTSP 포트 확인, 카메라별 수신, GPU·CPU 디코딩 선택, 연결·타임아웃 관리"],
            ["출력", "MFC 9채널 실시간 화면과 FFmpeg·NVENC 기반 H.264 MP4 파일"],
          ],
          implementation: [
            "카메라마다 수신 스레드와 녹화 스레드를 분리해 화면 표시와 파일 저장 경로를 독립 처리",
            "RTSP 포트 상태를 확인하고 CUDA 사용 가능 여부에 따라 GPU·CPU 디코딩 경로 선택",
            "MFC UI에서 카메라별 영상과 노출·초점·조명 제어값을 함께 관리",
            "녹화 스레드에서 FFmpeg와 NVENC를 사용해 H.264 MP4 파일 생성",
          ],
          lifecycle: [
            "GPU 프레임 수신에 시간 제한을 두고 실패 시 해당 카메라 상태를 갱신해 재연결 판단 흐름으로 전환",
            "종료 시 녹화를 중단하고 수신·녹화 스레드를 기다린 뒤 OpenCV·FFmpeg 자원을 순서대로 해제",
          ],
          results: [
            "9개 RTSP 영상 표시와 카메라·조명·녹화 제어를 한 화면에 통합",
            "CUDA 사용 가능 여부에 따라 GPU·CPU 디코딩 경로를 선택하고 카메라별 수신·녹화 흐름을 독립 관리",
          ],
        },
      },
    },
  };
})();
