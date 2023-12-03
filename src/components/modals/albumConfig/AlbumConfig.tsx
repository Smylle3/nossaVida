import { useState } from 'react';
import { MdDelete } from 'react-icons/md';

import useFirestore from '../../../hooks/useFirestore';
import MyButton from '../../defaultComponents/myButton/MyButton';
import Description from '../../description/Description';
import MyModal from '../../defaultComponents/myModal/MyModal';
import './AlbumConfig.css';
import DeleteImageModal from '../confirmModal/ConfirmModal';

interface AlbumConfigProps {
	modalConfig: boolean;
	setModalConfig: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AlbumConfig({ modalConfig, setModalConfig }: AlbumConfigProps) {
	const { albums, deleteAlbum, docs } = useFirestore();
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	return (
		<MyModal openModal={modalConfig} setOpenModal={setModalConfig} footer>
			<div className="modalAlbumConfigContainer">
				<h3>Edição de álbuns</h3>
				{albums.map((album) => (
					<div className="modalAlbumConfigSingleAlbum" key={album.id}>
						<Description
							typeValue="album"
							text={album.name}
							title=""
							isEdit
							id={album.id}
						/>
						<MyButton
							type="edge"
							className="modalAlbumConfigDeleteButton"
							formType="submit"
							onClick={() => setOpenDeleteModal(true)}
						>
							<MdDelete />
						</MyButton>
						<DeleteImageModal
							openDeleteModal={openDeleteModal}
							setOpenDeleteModal={setOpenDeleteModal}
							okText="Deletar álbum 😢"
							okFunction={() => {
								deleteAlbum(album), setOpenDeleteModal(false);
							}}
							text={`🗑️ Tem certeza que quer deletar o álbum ${
								album.name
							}, ${
								docs.filter(
									(image) =>
										image.album?.some(
											(album) => album.id === album.id,
										),
								).length
							} imagem serão afetadas com essa ação? 🗑️`}
						/>
					</div>
				))}
				<div className="line" />
				<h3>Adicionar novo álbum</h3>
				<Description
					typeValue="album"
					text=""
					title=""
					placeHolder="Nome do álbum"
					isEdit
					id=""
				/>
			</div>
		</MyModal>
	);
}
