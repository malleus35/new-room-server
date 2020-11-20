interface data {
    [attr: string]: any;
}
interface KafkaData {
    status: "Fail" | "Success";
    data: data;
}
export default KafkaData;
